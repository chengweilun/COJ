import docker
import shutil
import os
import uuid

from docker.errors import *

IMAGE_NAME = "weiluncheng/coj_demo"

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = "%s/tmp/" %CURRENT_DIR

SOURCE_FILE_NAMES = {
    "java": "Example.java",
    "python": 'example.py'
}

BUILD_COMMAND = {
    "java": "javac",
    "python": "python"
}

BINARY_NAMES = {
    "java": "Example",
    "python": "example.py"
}

EXECUTE_COMMANDS = {
    "java": "java",
    "python": "python"
}

client = docker.from_env()

def load_image():
    try:
        client.images.get(IMAGE_NAME)
    except ImageNotFound:
        print "not found local image. loading from docker hub"
        client.images.pull(IMAGE_NAME)
    except APIError:
        print "Image not found local. DOckerHub is not avaliable"
        return
    print "Image:[%s] loaded" %IMAGE_NAME

def build_and_run(code,lang):
    result = {'build':None, 'run':None, 'error': None}

    source_file_parentt_dir_name = uuid.uuid4()
    source_file_host_dir = "%s/%s" %(TEMP_BUILD_DIR, source_file_parentt_dir_name)
    source_file_guest_dir = "/test/%s" %(source_file_parentt_dir_name)
    make_dir(source_file_host_dir)

    with open('%s/%s' % (source_file_host_dir,SOURCE_FILE_NAMES[lang]),'w') as source_file:
        source_file.write(code)

    try:
        client.containers.run(
            image=IMAGE_NAME,
            command="%s %s" %(BUILD_COMMAND[lang],SOURCE_FILE_NAMES[lang]),
            volumes ={source_file_host_dir: {'bind':source_file_guest_dir, 'mode':'rw'}},
            working_dir = source_file_guest_dir
        )
        print "Source built."
        result['build'] = 'OK'
    except ContainerError as e:
        print "Build failed"
        result['build'] = e.stderr
        shutil.rmtree(source_file_host_dir)
        return result

    try:
        log = client.containers.run(
            image=IMAGE_NAME,
            command = "%s %s"% (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
            volumes ={source_file_host_dir: {'bind':source_file_guest_dir, 'mode':'rw'}},
            working_dir = source_file_guest_dir
        )
        print "Execited."
        result['run'] = log
        print result['run']
    except ContainerError as e:
        print "Execution failed"
        result['run'] = e.stderr
        print result['run']
        shutil.rmtree(source_file_host_dir)
        return result

    shutil.rmtree(source_file_host_dir)
    return result

def make_dir(dir):
    try:
        os.mkdir(dir)
        print "Temp build directory [%s] created." % dir
    except OSError:
        print "Temp build directory [%s] exists." % dir
