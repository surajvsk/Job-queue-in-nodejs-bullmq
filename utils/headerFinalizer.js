const { v4: uuidv4 } = require('uuid');

module.exports = {
    
    powerShellFinalHeaderScript: (macroDocPath , template_path , question_paper_path, header_data, instructionsArray, instLineNo) => {
        console.log('macroDocPath:::::::>>>>', macroDocPath)
        console.log('template_path:::::::>>>>', template_path)
        // console.log('header_data>>>>>:::::::>>>>', header_data)
        let instructStr = ''
        for(let i = 0; i < instructionsArray.length; i++){
            const escapedInstruction = instructionsArray[i].replaceAll(`"`, '`"').replaceAll(`'`, "`'");
            instructStr += `$instructions.SetValue("${escapedInstruction}", ${i})` + '\n'
        }
        let instructionLength = instructionsArray.length
        // let templatePath = file_path;
        //ALL THE INPUT PARAM SHOULD BE INCLOSED IN SIDE THE DOUBLE QUOTATION 
        //$xinstruction = "${JSON.parse(Instructions)}"
        let cmd = `

        #INPUT PARAMETERS TO BE PASSED
        $word = New-Object -ComObject Word.Application
        $word.Visible = $false
        $doc = $word.Documents.Open("${macroDocPath}")
        $headerTemplatePath = "${template_path}"
        $qpPath = "${question_paper_path}"
        $xuniv = "${header_data.institute_name}"
        $xprog = "${header_data.program_name}"
        $xschool = "${header_data.college_name}"
        $xyear = "${!header_data.exam_year ? "NA" : header_data.exam_year +'-'+ (Number(header_data.exam_year) +1)}"
        $xhour = "${header_data.duration}"
        $xdate = "${header_data.exam_date ?? "NA"}"
        $xtime = "${header_data.exam_time ?? "NA"} to ${header_data.exam_etime ?? "NA"}"
        $xsub = "${header_data.subject_name}"
        $xsem = "${header_data.acad_session}"
        $xmarks = "${header_data.marks}"
        $xbatchyear = "${header_data.year ?? ""}"
        $xbatch = "${header_data.acad_year +'-'+ (Number(header_data.acad_year) +1)}"
        $instLineNo = ${instLineNo}
        $xexamtype = "${header_data.exam_type}"
        $instructions = [System.Array]::CreateInstance([String], ${instructionLength})
        ${instructStr}
        $doc.GetType().InvokeMember("addInst", [Reflection.BindingFlags]::InvokeMethod, $null, $doc, @($headerTemplatePath, $qpPath,$instLineNo, $xuniv, $xprog, $xschool, $xyear, $xhour, $xdate, $xtime, $xsub, $xsem, $xmarks, $xbatchyear, $xbatch, $xexamtype, $instructions))

        $doc.Close()
        $word.Quit()
        return "done"
`
console.log('cmd::::::::::::::::::::::::::::::::::', cmd)
        return cmd;
    }
}