import { existsSync } from 'fs';

export const checkIsConfig = (item) => {
  return item === '-c';
}

export const checkDuplicate = (array) => {
  return new Set(array).size !== array.length
}

export const updateArgs = (array) => {
  return array.map(item => {
    if (item === '--config') return '-c';
    if (item === '--input') return '-i';
    if (item === '--output') return '-o';
    return item;
  })
}

export const showError = (mes) => {
  process.stderr.write(mes);
  process.exit(1);
}

export const getConfig = (args) => {
  const resArgs = {
    params: '',
    input: '',
    output: '',
  };
  
  const modArgs = updateArgs(args);
  
  if(modArgs.some(checkIsConfig)) {

    if (checkDuplicate(modArgs)) {
      showError("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    }
    modArgs.forEach((item, index) => {
      if (item === '-c') {
        const conf = modArgs[index + 1]?.trim();
        
        if(conf) {
          if(conf[conf.length - 1] === "-") {
            showError("ERROR: Check your config");
          } 

          conf.split('-').forEach(item => {
            if(item !== 'C0' && item !== 'C1' && item !== 'R0' && item !== 'R1' && item !== 'A') {
              showError("ERROR: Check your config");
            }
          })

          resArgs.params = conf;
        }
      }

      if (item === '-i') {
        const inputPath = modArgs[index + 1]?.trim() || '';
        if(existsSync(inputPath)) {
          resArgs.input = inputPath;
        } else {
          showError("ERROR: Check your input file path");
        }
      }

      if (item === '-o') {
        const outputPath = modArgs[index + 1]?.trim() || '';
        if(existsSync(outputPath)) {
          resArgs.output = outputPath;
        } else {
          showError("ERROR: Check your output file path");
        }
      }
    });
  
  } else {
    showError("ERROR: Config option is required! Try use '-c' or '--config'")
  }

  return resArgs;
}
