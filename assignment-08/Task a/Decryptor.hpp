#pragma once
#include <iomanip>
#include <iostream>
#include <openssl/evp.h>
#include <openssl/sha.h>
#include <string>
#include <sstream>
#include <fstream>

/*
 * Class used for decrypting passwords that
 * are encrypted with OpenSSL's PBKDF2
 */
class Decryptor {
  const std::string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  std::string key;
  std::string salt;
  int iterations;
  int maxLen;
  int keyLen;

public:
  Decryptor(std::string k, std::string s, int i, int m) {
    key = k;
    salt = s;
    iterations = i;
    maxLen = m;
    keyLen = k.length() / 2;
  }

  // Decrypts the password, returns empty string if not found
  std::string decryptPassword() {
    for (int i = 1; i <= maxLen; i++) {
      std::string password = calcHash(i, "");
      if (password != "")
        return password;
    }

    return "";
  }

private:
  
  // Recursive function to calculate hash (equivalent to n nested for loops)
  std::string calcHash(int n, std::string password) {
    for (char c : alphabet) {
      std::string tmp = password + c;
      
      // Outer loops add characters and pass it on to the inner loops 
      if (n > 1) {
        std::string decryption = calcHash(n - 1, tmp);
        if (decryption != "")
          return decryption;
      }
      
      // The inner loop does the hashing 
      else {
        std::string hash = PBKDF2(tmp, salt, iterations, keyLen);
        std::cout << hash << " - " << tmp << std::endl;
        
        // Returns password if hashes match 
        if (hash == key) {
          return tmp;
        }
      }
    }
    
    
    // Returns an empty string if password was not found 
    return "";
  }

  // Returns a hex string from bytes in input string
  std::string hex(const std::string &input) {
    std::stringstream hex_stream;
    hex_stream << std::hex << std::internal << std::setfill('0');
    for (auto &byte : input)
      hex_stream << std::setw(2) << (int)(unsigned char)byte;
    return hex_stream.str();
  }

  // Returns the PBKDF2 (Password-Based Key Derivation Function 2)
  std::string PBKDF2(const std::string &password, const std::string &salt, int iterations, int keyLen) {
    std::string key;
    key.resize(keyLen);

    PKCS5_PBKDF2_HMAC_SHA1((const char *)&password[0], password.size(), (const unsigned char *)&salt[0], salt.size(), iterations, keyLen, (unsigned char *)&key[0]);

    return hex(key);
  }
};