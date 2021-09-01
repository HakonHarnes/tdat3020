#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "fargeskrift.h"

int main(int argc, char *argv[]) {
   unsigned int fargenr, bakgr;
	
	if (argc != 2) {
		printf("Oppgi et ord, så fargelegger jeg det!\n");
		exit(1);
	}
   
   int len = strlen(argv[1]);
   char *d = malloc (strlen(argv[1]) + 1);
   strcpy(d, argv[1]);

   for(int i = 0; i < len; i++){
      fargenr = i % 7; 
      bakgr = (fargenr + 2) % 7; 
      
      farge_printf(fargenr, bakgr, "%c", (char) d[i]);
   } 

   farge_printf(9, 0, "\n");
}