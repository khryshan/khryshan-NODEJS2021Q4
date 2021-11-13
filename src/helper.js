const { exit } = process;

const checkIsConfig = (item) => {
  return item === '-c' || item === '--config';
}

export const showError = (mes) => {
  console.error("\x1b[31m", mes);
  exit(0);
}

export const getConfig = (args) => {
  const modArgs = {
    params: '',
    input: '',
    output: '',
  };

  if(args.some(checkIsConfig)) {
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
        modArgs.input = args[index + 1]?.trim() || '';
      }

      if (item === '-o' || item === '--output') {
        modArgs.output = args[index + 1]?.trim() || '';
      }
    });
  
  } else {
    showError("ERROR: Config option is required! Try use '-c' or '--config'")
  }

  return modArgs;
}
