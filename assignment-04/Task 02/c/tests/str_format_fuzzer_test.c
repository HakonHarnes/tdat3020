#include "../str_format.h"
#include <stddef.h>
#include <stdint.h>

int LLVMFuzzerTestOneInput(const uint8_t *data, size_t size) {
  char *output = strFormat((const char *)data, size);

  free(output);
  return 0;
}
