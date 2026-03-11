import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Purchases = () => {
  const sectionRef = useRef(null)
  // Default disciplines
  const [disciplines, setDisciplines] = useState([
    'Structural',
    'Architectural',
    'Plumbing',
    'Others'
  ])
  
  // Sample purchases data - in real app, this would come from state management or API
  const [purchases, setPurchases] = useState([
    {
      id: 1,
      amount: 5000,
      date: '2024-01-15',
      description: 'Steel beams for foundation',
      discipline: 'Structural',
      customFields: {}
    },
    {
      id: 2,
      amount: 3200,
      date: '2024-01-20',
      description: 'Windows and frames',
      discipline: 'Architectural',
      customFields: {}
    },
    {
      id: 3,
      amount: 1800,
      date: '2024-01-25',
      description: 'Pipe fittings',
      discipline: 'Plumbing',
      customFields: {}
    },
  ])

  const [showAddPurchase, setShowAddPurchase] = useState(false)
  const [showAddDiscipline, setShowAddDiscipline] = useState(false)
  const [newDisciplineName, setNewDisciplineName] = useState('')
  const [newPurchase, setNewPurchase] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    discipline: disciplines[0],
    customFields: {}
  })
  const [customFieldName, setCustomFieldName] = useState('')
  const [customFieldValue, setCustomFieldValue] = useState('')

  // Calculate totals per discipline
  const getDisciplineTotals = () => {
    const totals = {}
    disciplines.forEach(discipline => {
      totals[discipline] = purchases
        .filter(p => p.discipline === discipline)
        .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
    })
    return totals
  }

  const disciplineTotals = getDisciplineTotals()
  const grandTotal = Object.values(disciplineTotals).reduce((sum, val) => sum + val, 0)

  // Add new discipline
  const handleAddDiscipline = (e) => {
    e.preventDefault()
    if (newDisciplineName.trim() && !disciplines.includes(newDisciplineName.trim())) {
      setDisciplines([...disciplines, newDisciplineName.trim()])
      setNewDisciplineName('')
      setShowAddDiscipline(false)
    }
  }

  // Add new purchase
  const handleAddPurchase = (e) => {
    e.preventDefault()
    if (newPurchase.amount && newPurchase.description && newPurchase.discipline) {
      const purchase = {
        id: Date.now(),
        amount: parseFloat(newPurchase.amount),
        date: newPurchase.date,
        description: newPurchase.description,
        discipline: newPurchase.discipline,
        customFields: { ...newPurchase.customFields }
      }
      setPurchases([...purchases, purchase])
      setNewPurchase({
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        discipline: disciplines[0],
        customFields: {}
      })
      setShowAddPurchase(false)
    }
  }

  // Add custom field to new purchase
  const handleAddCustomField = () => {
    if (customFieldName.trim() && customFieldValue.trim()) {
      setNewPurchase({
        ...newPurchase,
        customFields: {
          ...newPurchase.customFields,
          [customFieldName.trim()]: customFieldValue.trim()
        }
      })
      setCustomFieldName('')
      setCustomFieldValue('')
    }
  }

  // Simple bar chart component
  const SimpleBarChart = ({ data, maxValue, label }) => {
    const percentage = maxValue > 0 ? (data / maxValue) * 100 : 0
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-900">${data.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${percentage}%` }}
          >
            {percentage > 10 && (
              <span className="text-xs font-semibold text-white">
                {percentage.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.purchases-heading', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.purchases-summary', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.from('.purchases-discipline-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [disciplines.length])

  return (
    <section
      id="purchases"
      ref={sectionRef}
      className="py-20 bg-gray-50 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 purchases-heading">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Purchases
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-400 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-6">Track and categorize purchases by discipline</p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowAddPurchase(!showAddPurchase)}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              {showAddPurchase ? 'Cancel' : '+ Add Purchase'}
            </button>
            <button
              onClick={() => setShowAddDiscipline(!showAddDiscipline)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {showAddDiscipline ? 'Cancel' : '+ Add Discipline'}
            </button>
          </div>
        </div>

        {/* Add Discipline Form */}
        {showAddDiscipline && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Discipline</h3>
            <form onSubmit={handleAddDiscipline} className="flex gap-4">
              <input
                type="text"
                value={newDisciplineName}
                onChange={(e) => setNewDisciplineName(e.target.value)}
                placeholder="Enter discipline name (e.g., Electrical, HVAC)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Discipline
              </button>
            </form>
          </div>
        )}

        {/* Add Purchase Form */}
        {showAddPurchase && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Purchase</h3>
            <form onSubmit={handleAddPurchase} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPurchase.amount}
                    onChange={(e) => setNewPurchase({ ...newPurchase, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newPurchase.date}
                    onChange={(e) => setNewPurchase({ ...newPurchase, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newPurchase.description}
                  onChange={(e) => setNewPurchase({ ...newPurchase, description: e.target.value })}
                  placeholder="Enter purchase description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discipline
                </label>
                <select
                  value={newPurchase.discipline}
                  onChange={(e) => setNewPurchase({ ...newPurchase, discipline: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {disciplines.map(discipline => (
                    <option key={discipline} value={discipline}>{discipline}</option>
                  ))}
                </select>
              </div>
              
              {/* Custom Fields Section */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Fields (Optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={customFieldName}
                    onChange={(e) => setCustomFieldName(e.target.value)}
                    placeholder="Field name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={customFieldValue}
                    onChange={(e) => setCustomFieldValue(e.target.value)}
                    placeholder="Field value"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Add Field
                  </button>
                </div>
                {Object.keys(newPurchase.customFields).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(newPurchase.customFields).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full flex items-center gap-2"
                      >
                        {key}: {value}
                        <button
                          type="button"
                          onClick={() => {
                            const newFields = { ...newPurchase.customFields }
                            delete newFields[key]
                            setNewPurchase({ ...newPurchase, customFields: newFields })
                          }}
                          className="text-primary-700 hover:text-primary-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Add Purchase
              </button>
            </form>
          </div>
        )}

        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 purchases-summary">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Total Summary</h3>
          <div className="text-3xl font-bold text-primary-600">
            ${grandTotal.toLocaleString()}
          </div>
        </div>

        {/* Breakdown by Discipline */}
        {disciplines.map(discipline => {
          const disciplinePurchases = purchases.filter(p => p.discipline === discipline)
          const total = disciplineTotals[discipline] || 0
          const maxTotal = Math.max(...Object.values(disciplineTotals), 1)

          return (
            <div key={discipline} className="bg-white rounded-xl shadow-lg p-6 mb-8 purchases-discipline-card">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{discipline}</h3>
                <div className="text-lg text-gray-600 mb-4">
                  Total: <span className="font-bold text-primary-600">${total.toLocaleString()}</span>
                  {grandTotal > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({(total / grandTotal * 100).toFixed(1)}% of total)
                    </span>
                  )}
                </div>
                
                {/* Chart */}
                <SimpleBarChart data={total} maxValue={maxTotal} label={discipline} />
              </div>

              {/* Purchases Table */}
              {disciplinePurchases.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                        {Object.keys(disciplinePurchases[0]?.customFields || {}).length > 0 && (
                          Object.keys(disciplinePurchases[0].customFields).map(key => (
                            <th key={key} className="text-left py-3 px-4 font-semibold text-gray-700 capitalize">
                              {key}
                            </th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {disciplinePurchases.map(purchase => (
                        <tr key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-700">
                            {new Date(purchase.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-gray-700">{purchase.description}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">
                            ${purchase.amount.toLocaleString()}
                          </td>
                          {Object.keys(purchase.customFields || {}).map(key => (
                            <td key={key} className="py-3 px-4 text-gray-600">
                              {purchase.customFields[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No purchases in this discipline yet.</p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Purchases
