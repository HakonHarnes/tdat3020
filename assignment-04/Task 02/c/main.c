#include "str_format.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {

  // Declares strings
  const char *str1 = "x & y";
  const char *str2 = "x < y & y > 0";
  const char *str3 = "& test < 123 <> &&";

  // Formats strings
  char *out1 = strFormat(str1, strlen(str1));
  char *out2 = strFormat(str2, strlen(str2));
  char *out3 = strFormat(str3, strlen(str3));

  // Prints strings
  printf("%-18s -> %s\n", str1, out1);
  printf("%-18s -> %s\n", str2, out2);
  printf("%-18s -> %s\n", str3, out3);

  // Frees pointers
  free(out1);
  free(out2);
  free(out3);

  return 0;
}