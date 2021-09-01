import MySQLdb
import sys


db = MySQLdb.connect(host="172.17.0.2", user="root", passwd="gwoieng23fjj", db="myshop")

cur = db.cursor()

welcome = "Welcome to myShop self-checkout!"
print('-'*80)
print(' '*(40-int(len(welcome)/2))+welcome)
print('-'*80)

while True:
    print("Please scan an item: ")
    barcode = input()

    if barcode == "":
        continue

    numrows = 0
    try:
        numrows = cur.execute("SELECT price FROM products WHERE id = %s", barcode)
    except:
        print("+++ ERROR exception, bad input")

    if numrows == 0:
        print("+++ ERROR product not found")
        continue

    for row in cur.fetchall():
        print("Price: %d,-" % row[0])
