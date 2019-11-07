# generate stats_standard_random.js from the csv file
# run after changing the csv
# https://www.freeformatter.com/javascript-escape.html works for this as well
echo -n 'var strStats = "'>stats_standard_random.js
perl -p -e  "s#\\\#\\\\\\\#g;s#'#\\\'#g;s#\n#\\\n#g;s#\r##g;"'s#\"#\\"#g;s#\t#\\t#g' stats_standard_random.csv>>stats_standard_random.js
echo '";'>>stats_standard_random.js
