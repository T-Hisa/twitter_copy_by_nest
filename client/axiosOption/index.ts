const commonOption = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default commonOption