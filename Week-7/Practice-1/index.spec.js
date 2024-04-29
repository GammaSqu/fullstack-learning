describe('Practice Week 1 - JS basic', function () {
  it(`addfunction return the value of x+y`, function () {
    let test1 = add(5, 4);

    expect(test1).toEqual(9);
  });
  it(`minusfunction return the value of x-y`, function () {
    let test2 = minus(10, 6);

    expect(test2).toEqual(4);
  });
  it(`checkExamResult function`, function () {
    let test3 = checkExamResult(80);

    expect(test3).toEqual(`PASS`);

    let test35 = checkExamResult(33);

    expect(test35).toEqual(`FAIL`);
  });
  it(`sumArray function`, function () {
    let test4 = sumArray([1, 3, 5]);

    expect(test4).toEqual(9);
  });
  it(`arrayAverage function`, function () {
    let test5 = arrayAverage([1, 3]);

    expect(test5).toEqual(2);
  });
  it(`addFromOneUntil function`, function () {
    let test6 = addFromOneUntil(10);

    expect(test6).toEqual(55);
  });

  it(`addFromOneUntil function - number less than 1`, function () {
    let test65 = addFromOneUntil(0.3);

    expect(test65).toEqual(0.3);
  });
  it(`addFromOneUntil function - variable is not a number`, function () {
    let test655 = addFromOneUntil(`b`);

    expect(test655).toEqual(`false`);
  });
  it(`uniqueItems function`, function () {
    let test7 = uniqueItems([`Lion`, `Lion`, 1, 8, 1]);

    expect(test7).toEqual([`Lion`, 1, 8]);

    let test8 = uniqueItems([`Lion`, 1, `Lion`, 1, 8, 1, `Lion`]);

    expect(test8).toEqual([`Lion`, 1, 8]);
  });
  it(`reverse function`, function () {
    let test8 = reverse([1, 3, 5]);

    expect(test8).toEqual([5, 3, 1]);
  });
  it(`reverse Sentence function`, function () {
    let test9 = reverseSentence(`Hello there, World!`);

    expect(test9).toEqual(`!dlroW ,ereht olleH`);
  });
  it(`Count Characters function`, function () {
    let test10 = countCharacters(`a`, `Character counting is awesome!`);

    expect(test10).toEqual(3);
  });
  it(`Count Characters function -  more than 1 characters`, function () {
    let test105 = countCharacters(`ae`, `Character counting is awesome!`);

    expect(test105).toEqual(false);
  });
  it(`Remove Numbers function`, function () {
    let test11 = removeNumber(1, [1, 3, 6, 4, 3, 1, 4, 1]);

    expect(test11).toEqual([3, 6, 4, 3, 4]);
  });
  it(`Get Largest Number function`, function () {
    let test12 = getLargestNumber([1, 3, 6, 4, 3, 1, 4, 1]);

    expect(test12).toEqual(6);
  });
  it(`Get Second Largest Number function`, function () {
    let test13 = getSecondLargestNumber([1, 3, 6, 4]);

    expect(test13).toEqual(4);
  });
  it(`Get Second Largest Number function - Array less than 2`, function () {
    let test135 = getSecondLargestNumber([1]);

    expect(test135).toEqual(`False - Array must contain at least 2 numbers`);
  });
  it(`Get Grade function`, function () {
    let test13 = getGrade([87]);

    expect(test13).toEqual(`B`);
  });
  it(`Get Numbers Larger Than 10 function`, function () {
    let test14 = getNumbersLargerThanTen([1, 33, 11, 5, 21, 10]);

    expect(test14).toEqual([33, 11, 21]);
  });
  it(`Unique In Order function`, function () {
    let test15 = uniqueInOrder([1, 33, 1, 11, 5, 10, 33, 11]);

    expect(test15).toEqual([1, 33, 11, 5, 10]);
  });
});
