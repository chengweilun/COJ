import { ProblemModel } from './problem.model';

export const mockProblems: ProblemModel[] = [{
  id: 1,
  name: 'Two Sum',
  desc: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.\n' +
    '\n' +
    'You may assume that each input would have exactly one solution, and you may not use the same element twice.',
  difficulty: 'Easy'
},
  {
    id: 2,
    name: 'Add Two Numbers',
    desc: 'You are given two non-empty linked lists representing two non-negative integers. ' +
      'The digits are stored in reverse order and each of their nodes contain a single digit. ' +
      'Add the two numbers and return it as a linked list.\n\n' +
      'You may assume the two numbers do not contain any leading zero, except the number 0 ' +
      'itself.',
    difficulty: 'Medium'
  },
  {
    id: 3,
    name: 'Longest Substring Without Repeating Characters',
    desc: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Medium'
  },
  {
    id: 4,
    name: 'Median of Two Sorted Arrays',
    desc: `There are two sorted arrays nums1 and nums2 of size m and n respectively.\n' + '\n' +
      'Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).\n' + '\n' +
      'You may assume nums1 and nums2 cannot be both empty.`,
    difficulty: 'Hard'
  }];

