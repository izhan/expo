let messages: string[] = [];
let packages: string[] = [];
let namedImports: string[] = [];

export default function deprecatedModule(message, namedImport, packageName) {
  if (__DEV__) {
    messages.push(message);
    packages.push(packageName);
    namedImports.push(namedImport);
    setTimeout(logWarning, 1000);
  }
}

function logWarning() {
  if (!messages.length) {
    return;
  }
  let instructions = '';

  messages = Array.from(new Set(messages));
  messages.sort();

  packages = Array.from(new Set(packages));
  packages.sort();

  namedImports = Array.from(new Set(namedImports));
  namedImports.sort();

  instructions += namedImports.join(', ');
  instructions += '.\n\n';
  instructions += '1. Add correct versions of these packages to your project using:\n\n';
  instructions += `   expo install ${packages.join(' ')}\n\n`;
  instructions += '   If "install" cannot be recognized as an expo command, update your expo-cli installation.\n\n';
  instructions += "2. Change your imports so they don't use 'expo' package, but specific packages instead:\n\n";
  messages.forEach(message => {
    instructions += ` - ${message}\n`;
  });

  instructions += '\n';
  console.log(
    `Following APIs have moved to separate packages and importing them from the 'expo' package is deprecated: ${instructions}`
  );
  messages = [];
  packages = [];
  namedImports = [];
}
