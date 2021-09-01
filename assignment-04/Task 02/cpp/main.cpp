#include <iomanip>
#include <iostream>
#include <regex>

std::string strFormat(std::string input);

int main() {
  std::string str1 = "x & y";
  std::string str2 = "x < y & y > 0";
  std::string str3 = "& test < 123 <> &&";

  std::cout << std::left << std::setw(18) << str1 << " -> " << strFormat(str1) << std::endl;
  std::cout << std::left << std::setw(18) << str2 << " -> " << strFormat(str2) << std::endl;
  std::cout << std::left << std::setw(18) << str3 << " -> " << strFormat(str3) << std::endl;
}

std::string strFormat(std::string input) {
  std::string output = std::regex_replace(input, std::regex("&"), "&amp;");
  output = std::regex_replace(output, std::regex("<"), "&lt;");
  output = std::regex_replace(output, std::regex(">"), "&gt;");
  return output;
}
