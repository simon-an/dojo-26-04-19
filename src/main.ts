export function dictonaryReplacer(dictionary: { [key: string]: string }, text: string) {
  Object.keys(dictionary).forEach(element => {
    text = text.replace(`$${element}$`, dictionary[element]);
  });
  return text;
}

export function dictonaryReplacer3(dictionary: { [key: string]: string }, text: string) {
  function toDict(match: any) {
    return dictionary[match.substr(1, match.length - 2)];
  }
  return text.replace(/\$([\w]*)\$/gi, toDict);

}

export function dictonaryReplacerForLoops(dictionary: { [key: string]: string }, text: string) {
  if (text.length <= 0) {
    return '';
  }

  let indices: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '$') {
      indices.push(i);
    }
  }

  if (indices.length % 2 === 1) {
    throw new Error('invalid amout of $');
  }

  let newString: string = '';
  if (indices[0] > 0) {
    newString += text.substring(0, indices[0]);
  }
  for (let index = 0; index < indices.length; index++) {
    const variableName = text.substring(indices[index] + 1, indices[index + 1]);
    if (index % 2 == 0) {
      newString += dictionary[variableName];
    } else {
      newString += variableName;
    }
  }
  return newString;
}
