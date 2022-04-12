// Takes param API and makes a fetch call to it, returns how long time it took for it to respond
async function fetchCall(api) {
  let before = performance.now()
  await fetch(api)
  let after = performance.now()
  let timeBetween = after - before
  return timeBetween
}

//  Toplist.fetchTop() fetch call should work and take less than 1 second
it('HTTP get. getTopList() call > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/toplist/gettoplist')
  let after = performance.now()
  let timeBetween = after - before
  console.log('getTopList', timeBetween)
  expect(res.status).toEqual(200)
  expect(timeBetween).toBeLessThan(1000)
})

// SubmittedAudio.getName() fetch call should work and take less than 1 second
it('HTTP get. getName() call > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/submittedaudio/5ed7d54def3b11318858ac51/getname')
  let after = performance.now()
  let timeBetween = after - before
  console.log('getName', timeBetween)
  expect(timeBetween).toBeLessThan(1000)
  expect(res.status).toEqual(200)
})

// SubmittedAudio.getRating() fetch call should work and take less than 1 second
it('HTTP get. getRating() call > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/submittedaudio/5ed7d54def3b11318858ac51/getrating')
  let after = performance.now()
  let timeBetween = after - before
  console.log('getRating', timeBetween)
  expect(timeBetween).toBeLessThan(1000)
  expect(res.status).toEqual(200)
})

// SubmittedAudio.loadAudio() fetch call should work and take less than 1 second
it('HTTP get. loadAudio() call > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/submittedaudio/5ed7d54def3b11318858ac51/getaudio')
  let after = performance.now()
  let timeBetween = after - before
  console.log('loadAudio', timeBetween)
  expect(timeBetween).toBeLessThan(1000)
  expect(res.status).toEqual(200)
})

// SubmittedAudio.handleDislikeButton() fetch call should work and take less than 1 second
it('HTTP patch. disLikeButton() post > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/submittedaudio/5ed7d54def3b11318858ac51', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fetchTest: true })
  })
  let after = performance.now()
  let timeBetween = after - before
  expect(res.status).toEqual(200)
  expect(timeBetween).toBeLessThan(1000)
})

// SubmittedAudio.handleLikeButton() fetch call should work and take less than 1 second
it('HTTP patch. handleLikeButton() > 1s. status 200', async () => {
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/submittedaudio/5ed7d54def3b11318858ac51', {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fetchTest: true })
  })
  let after = performance.now()
  let timeBetween = after - before
  expect(res.status).toEqual(200)
  expect(timeBetween).toBeLessThan(1000)
})


// Submit.postFile() fetch call should work and take less than 1 second
it('HTTP post. postFile() post > 1s', async () => {
  // Creates an empty file to submit
  let testFile = new File(['fetchTest'], 'fetchTest.wav', {
    type: 'audio/ogg; codecs=opus'
  })
  let formData = new FormData()
  formData.append('inpFile', testFile, 'fetchTest')
  formData.append('format', 'wav')
  formData.append('rating', 0)
  formData.append('customName', 'fetchTestCustomName')
  let before = performance.now()
  let res = await fetch('http://78.70.175.39:5000/upload', {
    method: 'POST',
    body: formData,
  })
  let after = performance.now()
  let timeBetween = after - before
  expect(res.status).toEqual(201)
  expect(timeBetween).toBeLessThan(1000)
})
