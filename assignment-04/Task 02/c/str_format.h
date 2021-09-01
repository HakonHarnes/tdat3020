#pragma once
#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *strFormat(const char *input, size_t size) {

  // Finds size of new string
  size_t newSize = size;
  for (size_t i = 0; i < size; i++) {
    if (input[i] == '&') {
      newSize += 4;
    } else if (input[i] == '<' || input[i] == '>') {
      newSize += 3;
    }
  }

  // Allocates memory for new string
  char *output = (char *)malloc(sizeof(char) * (newSize + 1));
  output[0] = '\0';

  // Replaces characters
  for (size_t i = 0; i < size; i++) {
    if (input[i] == '&') {
      strcat(output, "&amp;");
    } else if (input[i] == '<') {
      strcat(output, "&lt;");
    } else if (input[i] == '>') {
      strcat(output, "&gt;");
    } else {
      strcat(output, (char[2]){(char)input[i], '\0'});
    }
  }

  // Returns new string
  return output;
}