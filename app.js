function compile() {
  
    var fgs = document.getElementById("fungsi"); var fungsi=(fgs.value).replace("^","**");
    var par = document.getElementById("par");
    var cons = document.getElementById("constraint");
    var code = document.getElementById("code").contentWindow.document;
    var basichtml="<html><head></head><body></body></html>";
    var basichtml_error="<html><head></head><body><h2>Error!</h2></body></html>";

    if (document.getElementById('minimasi').checked) {
      var problem= document.getElementById('minimasi').value;
    }
    if (document.getElementById('maksimasi').checked) {
      var problem= document.getElementById('maksimasi').value;
    }
    

    var allpar=get_allpar_withrange(par.value);
    if (checkIfDuplicateExists(allpar))
    {
        code.open();
        code.writeln(basichtml_error);
        code.close();
        alert("Duplicated parameter detected");
    }
    else{    
    var rmin=get_rmin(par.value);
    var rmax=get_rmax(par.value);
    var constraint=get_constrain(cons.value);
    var intdec=get_intdec(par.value);
    var code_newpar=set_allpar_random(allpar,fungsi,rmin,rmax,problem,constraint,intdec);
    code.open();
    code.writeln(     
      basichtml+
      "<script>"+      
      code_newpar+  
      "</script>"           
    );
    code.close();
    }
  }
  
  function checkIfDuplicateExists(w){
    return new Set(w).size !== w.length 
  }

  function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }
  
  
  function get_constrain(teks)
  {
    //fungsi ini untuk membangun code logika constrain    
    if (teks.length>0)
    {
      teks = teks.split(/[\s,]+/); //menghilangkan koma dan space: [a{5:7},b{9:10}]
      code="";
      var nm="";
      for(name in teks)
      {
        nm=teks[name];
        if(name>0)
        {
          code+=" && ";
        }
        code+= "("+nm+")";  
      }
    }
    else code="(1==1)";
    return code;
  }

  function showPar(allpar,allval)
  {
    //fungsi ini akan membuat code JS untuk menampilkan semua parameter hasil running di result tab
    var code ="document.write('Parameter: </br>')"; 
    for(i in allpar)
    {
      if (i!=0)
      {
          variables += ", ";         
      } 
      variables += allpar[i];
      code ="document.write("+allpar[i]+"'='"+allval[i]+"'</br>')"; 
    }
  
    return code;  
    //return "hahaha </br>";
  }
  
  function get_allpar(teks)
  {
    //fungsi ini akan menghasilkan array yg berisi nama2 parameter
    teks = teks.split(/[\s=,]+/);
    var allpar = []; //nama parameter
    for(name in teks)
    {
      allpar.push(teks[name]);    
    }
  
    //allpar=allpar.filter( onlyUnique );
    return allpar;
  }

  function get_intdec(teks)
  {
    //fungsi ini akan menghasilkan array berupa nilai 1:untuk integer, dan 0 untuk non-integer, defaultnya int
    teks = teks.split(/[\s,]+/); //menghilangkan koma dan space: [a{5:7},b{9:10}]
    var intdec = []; //nama parameter
    var nm="";
    for(name in teks)
    {
      nm=teks[name];
      nm=nm.substring(nm.indexOf("}")+1,nm.length);
      if(nm=="dec")      
        intdec.push(0); 
      else
        intdec.push(1);
    }
    return intdec;
  }
  
  function get_allpar_withrange(teks)
  {
    //fungsi ini akan mereturn parameter dengan tipe teks ada rangenya
    //ex teks="a{5:7},b{9:10}"
    teks = teks.split(/[\s,]+/); //menghilangkan koma dan space: [a{5:7},b{9:10}]
    var allpar = []; //nama parameter
    var nm="";
    for(name in teks)
    {
      nm=teks[name];
      nm=nm.substring(0,nm.indexOf("{"));
      allpar.push(nm);    
    }
    return allpar;
  }

  function get_rmin(teks)
  {
    //fungsi ini akan mereturn range min dari teks
    //ex teks="a{5:7},b{9:10}"
    teks = teks.split(/[\s,]+/); //menghilangkan koma dan space: [a{5:7},b{9:10}]
    var rmin = []; //nama parameter
    var nm="";
    for(name in teks)
    {
      nm=teks[name];      
      nm=nm.substring(nm.indexOf("{")+1,nm.indexOf(":"));
      rmin.push(parseInt(nm));    
    }    
    return rmin;
  }
  
  function get_rmax(teks)
  {
    //fungsi ini akan mereturn range min dari teks
    //ex teks="a{5:7},b{9:10}"
    teks = teks.split(/[\s,]+/); //menghilangkan koma dan space: [a{5:7},b{9:10}]
    var rmax = []; //nama parameter
    var nm="";
    for(name in teks)
    {
      nm=teks[name];      
      nm=nm.substring(nm.indexOf(":")+1,nm.indexOf("}"));
      rmax.push(parseInt(nm));    
    }    
    return rmax;
  }

  function set_allpar(allpar,fungsi)
  {
    //fungsi ini digunakan untuk mengeset nilai parameter dengan nilai baru  
    n=allpar.length;
    var code="";   
    code += "var FO=Infinity;";
    code += "var best=Infinity;";
  
    for (i = 10; i >= 0; i--) {
    
      for(j in allpar)
      {     
          code += allpar[j]+"="+i+";";
      }
      //code +="alert("+fungsi+");";
      code += "FO="+fungsi+";";
      code += "if(FO<best){best=FO};";
    }
    
    code+="document.write('FO: '+best) </br>";
    return code;
  }
  
  function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }
  
  
  function set_allpar_random(allpar,fungsi,rmin,rmax,problem,constraint,intdec)
  {
    //algoritma random
  
    var n=allpar.length;    
    var iterasi=100;
  
    //output
    var allval=[];
    var has=0;
  
    var code="";
    code += "function getRandomArbitrary(min, max){return Math.random() * (max - min) + min;}";   
    code += "var allval=[];";
    code += "var bestval=[];";
    if(problem=="min")
      code += "var best=Infinity;";
    else
      code += "var best=-Infinity;";
    code += "var FO=best;";
    
  
    //membuat range

    //code += "var rmin=-10;";
    //code += "var rmax=10;";
    
    code += "var rmin=[];";
    code += "var rmax=[];";
    for(j in allpar)
      {    
        code += "rmin.push("+rmin[j]+");";
        code += "rmax.push("+rmax[j]+");";
      }
    
  
    for (i = 1; i <= iterasi; i++) {  
      code +="allval=[];";
      for(j in allpar)
      {     
          code += "has=getRandomArbitrary(rmin["+j+"],rmax["+j+"]);";
          
          //logical int or not
          code += "if("+intdec[j]+"==1) has=Math.round(has);";

          code += "allval.push(has);";
          code += allpar[j]+"="+"has"+";";
      }
  
      //constraint
      
      code += "if("+constraint+"){";

        code += "FO="+fungsi+";";
        if(problem=="min")
          code += "if(FO<best){best=FO;bestval=allval;};";
        else
          code += "if(FO>best){best=FO;bestval=allval;};";

      code +="}";
    }
    
  
    //CODE TO DISPLAY
    code+="document.write('>>Parameter Optimal: </br>');";  
    code += "var nil=0;";
    for(j in allpar)
    {
      code += "nil=bestval["+j+"];";
      code+="document.write("+"'"+allpar[j]+"'"+"+' = '+nil+'</br>');";
      //code += "document.write('"+ allpar[j]+"='"+"nil"+"' </br>');";
    }
    code+="document.write('</br> >>Objective Function: </br>'+best);";
    return code;
  }
  
  
  
  //document.getElementById("pso_opt").disabled = true;
  //compile();
  
  // BACK UP
  /*
  //fungsi ini akan otomatis mengrunning ketika user mengetik sesuatu tepat saat meepaskan ketikannya
  function compile() {
    var fungsi = document.getElementById("fungsi");
    var par = document.getElementById("par");
    var code = document.getElementById("code").contentWindow.document;
    var basichtml="<html><head></head><body></body></html>";
  
    document.body.onkeyup = function() {
      var allpar=get_allpar(par.value);
      var code_newpar=set_allpar_random(allpar,fungsi.value);
      code.open();
      code.writeln(     
        basichtml+
        "<script>"+      
        code_newpar+  
        "</script>"           
      );
      code.close();
    };
  }
  compile()
  */