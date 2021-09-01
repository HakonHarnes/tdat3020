fn main() {
    let str1 = String::from("x & y");
    let str2 = String::from("x < y & y > 0");
    let str3 = String::from("& test < 123 <> &&");
    
    println!("{: <18} -> {}", "x & y", str_format(str1));
    println!("{: <18} -> {}", "x < y & y > 0", str_format(str2));
    println!("{: <18} -> {}", "& test < 123 <> &&", str_format(str3));
}

fn str_format(input: String) -> String {
    return input.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");     
}
