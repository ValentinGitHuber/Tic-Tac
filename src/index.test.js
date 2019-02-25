
function defaultBoard() {
    return new Array(9).fill('');
}

test('default board', () => {
  expect(defaultBoard()).toEqual(['', '', '', '', '', '', '', '', '']);
});
