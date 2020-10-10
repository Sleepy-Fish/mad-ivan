interface message {
  text: string;
}

function greeting (input: message): void {
  console.log(input.text);
}

greeting({
  text: 'Hello, World!',
});
