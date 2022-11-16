const baseURL = 
    process.env.NODE_ENV === 'development'
    ?
    'http://localhost:8000'
    :
    process.env.REACT_APP_BASE_URL

export default baseURL
