<html>
  <head>
    <title>Code Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />   
    
    <link rel="stylesheet" href="style.css" /> 
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>

  <body>
    
    <div class="container-fluid">
      <h1 style="text-align: center;">nobiLAB</h1>
      <p style="text-align: center;">
      Simple Programming languange for optimization modelling with various solver from exact, heuristic, and metaheuristics.</br>
      Developed by Nobita and friends from 22nd century, Indonesia.
      </p>
    
    </div>
    
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h5>Parameters</h5>
          <textarea id="par" placeholder="Parameters"></textarea>
        </div>  
        <div class="col-sm">
          <h5>Objective Function</h5>
          <textarea id="fungsi" placeholder="Objective function"></textarea> 
        </div>
        <div class="col-sm">
          <h5>Constraint</h5>
          <textarea id="constraint" placeholder="Constraint"></textarea> 
        </div>   
          
      </div>
      
      
      
    </div>
    

    <div class="container" style="align:right;">
          </br>
          <div class="row">
        <div class="col-sm">          
        </div>  
        <div class="col-sm">       
          <fieldset>        
            <input type="radio" id="minimasi" name="problem" value="min" checked>
            <label for="male">MIN</label>
            <input type="radio" id="maksimasi" name="problem" value="max">
            <label for="female">MAX</label>
          </fieldset>       
        </div>
        <div class="col-sm">
          <div class="float-right">
            <button class="btn btn-primary " type="submit" onclick="compile()">Run</button>
          </div>          
        </div>           
      
    </div>
    
    <div class="container-fluid">
      <div class="row">
        <div class="col-3"> 
          <h5>Solver option</h5>
          <fieldset>        
            <input type="radio" id="random_opt" name="solver" value="random" checked>
            <label for="male">Random optimization</label> </br>
            <input type="radio" id="pso_opt" name="solver" value="pso">
            <label for="female">Particle swarm optimization</label></br>
            <input type="radio" id="ga_opt" name="solver" value="ga">
            <label for="female">Genetic algorithm</label></br>
            <input type="radio" id="pso_opt" name="solver" value="ff">
            <label for="female">Firefly Optimization</label></br>
            <input type="radio" id="sa_opt" name="solver" value="sa">
            <label for="female">Simulated annealing</label></br>
          </fieldset>           
        </div> 
        <div class="col-3">  
          <h5>Variable Setting</h5>
          <div id=varset>
            <div class="form-group">
              <label for="iterasi">Iteration</label>
              <input type="text" class="form-control" id="iterasi" placeholder="ex: 100">
            </div>            
          </div>
        </div> 
        <div class="col-6">  
          <h5>Result</h5>
          <iframe id="code"></iframe>        
        </div> 
      </div>
      
    </div>

    <script type="text/javascript" src="app.js"></script>
  </body>
</html>
