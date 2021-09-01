#include "Decryptor.hpp"

int main() {
  
  // Variables used for decrypting 
  const std::string key = "ab29d7b5c589e18b52261ecba1d3a7e7cbf212c6";
  const std::string salt = "Saltet til Ola";
  const int iterations = 2048;
  const int maxLen = 10;
  
  // Initializes decryptor 
  Decryptor decryptor(key, salt, iterations, maxLen);
  std::string password = decryptor.decryptPassword();

  // Prints the result of the decryption 
  if (password != "")
    std::cout << "\nPASSWORD FOUND: " << password << "\n"
              << std::endl;
  else
    std::cout << "\nUNABLE TO DECRYPT PASSWORD!\n"
              << std::endl;

  /*
                 -- OUTPUT -- 
   146a0ad2711640cb8cb2e40b1c27435c2e8ba3c3 - QwC
   975f6b1a139b3be77ca83be02ce2946beb877be4 - QwD
   ab29d7b5c589e18b52261ecba1d3a7e7cbf212c6 - QwE
   
   PASSWORD FOUND: QwE
   
   */
}