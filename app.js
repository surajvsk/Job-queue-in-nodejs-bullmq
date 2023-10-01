// app.js

const express = require('express');
const app = express();
const {
  exec
} = require('child_process');
const routes = require('./routes');
const { jobQueueMiddleware } = require('./jobQueueMiddleware');
const {
  powerShellFinalHeaderScript
} = require("./utils/headerFinalizer");
app.use(express.json());

// Apply the job queue middleware to the desired route
app.post('/data', jobQueueMiddleware, async  (req, res) => {
  // Process the job queue task and fetch data from the database
  // Example: Query the database, perform calculations, etc.

  console.log('req.body:::::::::', req.body)

  let final_qp_uploaded = await new Promise((resolve, reject) => {
    let absoulte_path =  `./doc/NEW.docx`;
    let pdf_path =  `./doc/NEW.pdf`;

    let psscript = `$word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Open("./doc/c7e6d1d5-cea4-490c-aa4d-9aad60d7550fsynopticsmacro_416.dotm")
    $headerTemplatePath = "./doc/94fc48ec-56ac-4a96-b7c1-2ab14ed4221cDatabase_Management_System-Semester_III-QPTemplate(2).docx"
    $qpPath = "${absoulte_path}"
    $xuniv = "SVKM"
    $xprog = "BACHELOR OF SCIENCE INFORMATION TECHNOLOGY (B.Sc.-I.T.)-(CBCGS)"
    $xschool = "Narsee Monjee College of Com. & Eco."
    $xyear = "NA"
    $xhour = "02:30"
    $xdate = "NA"
    $xtime = "NA to NA"
    $xsub = "Database Management System"
    $xsem = "Semester III"
    $xmarks = "75"
    $xbatchyear = " II"
    $xbatch = "2023-2024"
    $instLineNo = 22
    $xexamtype = "FINAL"
    $instructions = [System.Array]::CreateInstance([String], 6)
    $instructions.SetValue("Answer to each new question to be started on a fresh page.", 0)
    $instructions.SetValue("Figure in right hand side indicates full marks.", 1)
    $instructions.SetValue("All Question are compulsory.", 2)
    $instructions.SetValue("All questions carry equal marks.", 3)
    $instructions.SetValue("Given database should be used wherever required.", 4)
    $instructions.SetValue("Given database should be used wherever required.", 5)
    $doc.GetType().InvokeMember("addInst", [Reflection.BindingFlags]::InvokeMethod, $null, $doc, @($headerTemplatePath, $qpPath,$instLineNo, $xuniv, $xprog, $xschool, $xyear, $xhour, $xdate, $xtime, $xsub, $xsem, $xmarks, $xbatchyear, $xbatch, $xexamtype, $instructions))

    $doc.Close()
    $word.Quit()
    return "done"`;

    // console.log('psscript::::::::::::', psscript)
    let doc_to_pdf = `$Files = Get-ChildItem './docs/*.docx'
$Word = New-Object -ComObject Word.Application
Foreach ($File in $Files) {
    $Doc = $Word.Documents.Open($File.FullName)
    $Name=($Doc.FullName).replace('docx', 'pdf')
    $Doc.SaveAs($Name, 17)
    $Doc.Close()
}`;
    console.log('doc_to_pdf:::::::',doc_to_pdf)
    exec(doc_to_pdf, {
        'shell': 'powershell.exe'
    }, (error, stdout, stderr) => {
        if (error) {
            console.log('error:::::::::::::::::::::::', error)
            return reject(error);
        } else if (stdout) {
            console.log('stdout:::::oye balle', stdout)
            return resolve(pdf_path)
        } else {
            console.log('stderrr else :::::::::::', stderr)
            return reject(stderr);
        }
    })
  })
  console.log('final_qp_uploaded:::::::::', final_qp_uploaded)


  // Retrieve the data and send the response
  console.log('jobId::::::::', req.jobId)
  const data = { /* Your fetched data */ };

  res.json({
    job_id: req.jobId,
    req:req.body
  });
});

// Mount the routes
app.use('/', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});