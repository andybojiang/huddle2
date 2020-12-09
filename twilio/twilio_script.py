import sys
import os

# How to use: 
# replace folder_path with the absolute path to your backend-new

file_name = "gettingstarted/settings.py"
my_whitelist = "DEFAULT NO MATCH"

name = sys.argv[1]
if name == "albert":
  folder_path = "/Users/zgong/sum2020/Backend/backend-new/"
  my_whitelist = "ALBERT_WHITELIST="
elif name == "vicky":
  # REPLACE LINE BELOW WITH YOUR ABSOLUTE PATH
  folder_path = "/Users/vickyli/Desktop/work/dev/backend-new/"
  my_whitelist = "VICKY_WHITELIST="
elif name == "albert-dev":
  # REPLACE LINE BELOW WITH YOUR ABSOLUTE PATH
  folder_path = "/Users/zgong/sum2020/Backend/backend-new/"
  my_whitelist = "DEV_WHITELIST="
elif name == "vicky-dev":
  folder_path = "/Users/vickyli/Desktop/work/dev/backend-new/"
  my_whitelist = "DEV_WHITELIST="
else:
  print('unknown user argument')
  exit()


reading_file = open(folder_path + file_name, "r")

new_file_content = ""
for line in reading_file:
  stripped_line = line.strip()
  if (my_whitelist in stripped_line):
    new_line = my_whitelist + "\"" + sys.argv[2] + "\""
  else:
    new_line = stripped_line
  new_file_content += new_line +"\n"
reading_file.close()

writing_file = open(folder_path + file_name, "w")
writing_file.write(new_file_content)
writing_file.close()

os.chdir(folder_path)
os.system('git add .')
os.system('git commit -m \"wl albert\"')
os.system('git push heroku master')

