import { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState(null)
  const [originalUsers, setOriginalUsers] = useState(null)
  const [order, setOrder] = useState(false)
  const [isColorActive, setIsColorActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const url = "https://randomuser.me/api/?results=100"

  const getUsers = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.log("Algo ha ido mal", res.statusText)
        setError(true)
        setIsLoading(false)
        return
      }
      const data = await res.json()
      setUsers(data.results)
      setOriginalUsers(data.results)
      setIsLoading(false)
      console.log(data)
    } catch (err) {
      console.log("Error", err.message)
      setError(true)
      setIsLoading(false)
    }
  }

  const orderByCountry = () => {
    if (users) {
      const sorted = Object.values(users).sort((a, b) => {
        const countryA = a.location.country.toLowerCase()
        const countryB = b.location.country.toLowerCase()
        if (countryA < countryB) {
          return -1
        }
        if (countryA > countryB) {
          return 1
        }
        return 0
      })
      setOrder(true)
      setUsers(sorted)
    }
    if (users && order) {
      const sorted = Object.values(users).sort((a, b) => {
        const countryA = a.location.country.toLowerCase()
        const countryB = b.location.country.toLowerCase()
        if (countryA > countryB) {
          return -1
        }
        if (countryA < countryB) {
          return 1
        }
        return 0
      })
      setOrder(false)
      setUsers(sorted)
    }
  }

  // ==> I used cell because is an unique value per user
  const handleDelete = (cell) => {
    const updateUsers = users.filter((user) => user.cell !== cell)
    setUsers(updateUsers)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <h1 className="text-2xl font-bold">Interview task</h1>
      <div className="mt-2">
        {error && <p>Something went wrong</p>}
        {isLoading && <p>Loading...</p>}
        <button
          className="px-2 border-2 border-black bg-slate-400"
          type="button"
          onClick={() => setIsColorActive(!isColorActive)}
        >
          Colored rows
        </button>
        <button
          className="px-2 border-2 border-black bg-slate-400"
          type="button"
          onClick={orderByCountry}
        >
          Sort by country
        </button>
        <button
          className="px-2 border-2 border-black bg-slate-400"
          type="button"
          onClick={() => setUsers(originalUsers)}
        >
          Restore the init state
        </button>
      </div>
      {users && (
        <table className="w-full mt-6">
          <thead>
            <tr className="head">
              <th>image</th>
              <th>name</th>
              <th>surname</th>
              <th>country</th>
              <th>delete</th>
            </tr>
          </thead>
          {Object.keys(users).map((index) => (
            // ==> users[index].id.value it's NOT an unique value!! I used users[index].cell and it works.
            <tbody key={users[index].cell}>
              <tr
                className={isColorActive && (index % 2 === 0 ? "even" : "odd")}
              >
                <td>
                  <div className="flex justify-center">
                    <img
                      src={users[index].picture.thumbnail}
                      alt="profile picture"
                    />
                  </div>
                </td>
                <td>{users[index].name.first}</td>
                <td>{users[index].name.last}</td>
                <td>{users[index].location.country}</td>
                <td>
                  <button
                    className="px-2 border-2 border-black bg-slate-400"
                    onClick={() => handleDelete(users[index].cell)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      )}
    </div>
  )
}

export default App
