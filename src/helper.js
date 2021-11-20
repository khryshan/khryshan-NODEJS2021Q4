import { existsSync } from 'fs';

export const checkIsConfig = (item) => {
  return item === '-c' || item === '--config';
}

export const checkDuplicate = (array) => {
  return new Set(array).size !== array.length
}

export const showError = (mes) => {
  process.stderr.write(mes);
  process.exit(1);
}

export const getConfig = (args) => {
  const modArgs = {
    params: '',
    input: '',
    output: '',
  };

  if(args.some(checkIsConfig)) {

    if (checkDuplicate(args)) {
      showError("ERROR: Check your config. Perhaps, there are duplicates of configurations.");
    }
    args.forEach((item, index) => {
      if (item === '-c' || item === '--config') {
        const conf = args[index + 1]?.trim();
        
        if(conf) {
          if(conf[conf.length - 1] === "-") {
            showError("ERROR: Check your config");
          } 

          conf.split('-').forEach(item => {
            if(item !== 'C0' && item !== 'C1' && item !== 'R0' && item !== 'R1' && item !== 'A') {
              showError("ERROR: Check your config");
            }
          })

          modArgs.params = conf;
        }
      }

      if (item === '-i' || item === '--input') {
        const inputPath = args[index + 1]?.trim() || '';
        if(existsSync(inputPath)) {
          modArgs.input = inputPath;
        } else {
          showError("ERROR: Check your input file path");
        }
      }

      if (item === '-o' || item === '--output') {
        const outputPath = args[index + 1]?.trim() || '';
        if(existsSync(outputPath)) {
          modArgs.output = outputPath;
        } else {
          showError("ERROR: Check your output file path");
        }
      }
    });
  
  } else {
    showError("ERROR: Config option is required! Try use '-c' or '--config'")
  }

  return modArgs;
}
