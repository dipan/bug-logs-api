const fs = require('fs');
const readline = require('readline');
const moment = require('moment');

let fileName = process.argv[2];
if (fileName === undefined) {
    fileName = "server_combined_" + moment().format("YYYY-MM-DD") + ".log";
}

let rl = readline.createInterface({
    input: fs.createReadStream("logs/" + fileName)
});

let line_no = 0;

// event is emitted after each line
rl.on('line', function (line) {
    line_no++;
    console.log(JSON.parse(line).message);
});

// end
rl.on('close', function (line) {
    console.log('Total lines : ' + line_no);
});