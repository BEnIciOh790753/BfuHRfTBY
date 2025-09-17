// 代码生成时间: 2025-09-17 18:00:50
import { Injectable } from '@angular/core';

/**
 * SortAlgorithmService provides sorting algorithms implementation.
 *
 * @export
 * @class SortAlgorithmService
 */
@Injectable({
  providedIn: 'root'
})
export class SortAlgorithmService {

  /**
   * BubbleSort performs the Bubble Sort algorithm on an array of numbers.
   * @param {number[]} array - The array to be sorted.
   * @returns {number[]} - The sorted array.
   * @throws {Error} - If the input array is not an array of numbers.
   */
  public bubbleSort(array: number[]): number[] {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'number')) {
      throw new Error('Input must be an array of numbers.');
    }

    let len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap elements
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /**
   * QuickSort performs the Quick Sort algorithm on an array of numbers.
   * @param {number[]} array - The array to be sorted.
   * @returns {number[]} - The sorted array.
   * @throws {Error} - If the input array is not an array of numbers.
   */
  public quickSort(array: number[]): number[] {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'number')) {
      throw new Error('Input must be an array of numbers.');
    }

    if (array.length <= 1) {
      return array;
    }

    const left: number[] = [];
    const right: number[] = [];
    const pivot = array[array.length - 1];
    const middle = array.slice(0, array.length - 1);

    for (let i = 0; i < middle.length; i++) {
      if (middle[i] < pivot) {
        left.push(middle[i]);
      } else {
        right.push(middle[i]);
      }
    }

    return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
  }

  /**
   * InsertionSort performs the Insertion Sort algorithm on an array of numbers.
   * @param {number[]} array - The array to be sorted.
   * @returns {number[]} - The sorted array.
   * @throws {Error} - If the input array is not an array of numbers.
   */
  public insertionSort(array: number[]): number[] {
    if (!Array.isArray(array) || !array.every(item => typeof item === 'number')) {
      throw new Error('Input must be an array of numbers.');
    }

    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
    }
    return array;
  }
}
