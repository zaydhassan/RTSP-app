import React, { useState } from 'react'
import axios from 'axios'

export default function OverlayEditor({ overlays, refreshOverlays }) {
  const [form, setForm] = useState({
    content: "",
    position: { x: 10, y: 10 },
    size: { w: 120, h: 40 }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleCreate() {
    setLoading(true); setError("")
    axios.post('/overlays', form)
      .then(() => { setForm({ ...form, content: "" }); refreshOverlays(); })
      .catch(() => setError("Failed to create overlay."))
      .finally(()=>setLoading(false))
  }
  function handleDelete(id) {
    setLoading(true); setError("")
    axios.delete(`/overlays/${id}`)
      .then(refreshOverlays)
      .catch(() => setError("Failed to delete overlay."))
      .finally(()=>setLoading(false))
  }
  return (
    <div>
      <h3>Overlay Editor</h3>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <input
        placeholder="Text/Logo URL"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <input
        type="number"
        placeholder="X"
        value={form.position.x}
        onChange={e => setForm({ ...form, position: { ...form.position, x: parseInt(e.target.value) || 0 } })}
      />
      <input
        type="number"
        placeholder="Y"
        value={form.position.y}
        onChange={e => setForm({ ...form, position: { ...form.position, y: parseInt(e.target.value) || 0 } })}
      />
      <input
        type="number"
        placeholder="Width"
        value={form.size.w}
        onChange={e => setForm({ ...form, size: { ...form.size, w: parseInt(e.target.value) || 0 } })}
      />
      <input
        type="number"
        placeholder="Height"
        value={form.size.h}
        onChange={e => setForm({ ...form, size: { ...form.size, h: parseInt(e.target.value) || 0 } })}
      />
      <button onClick={handleCreate} disabled={loading || !form.content.trim()}>
        {loading ? "Submitting..." : "Create Overlay"}
      </button>
      <ul>
        {overlays.map(ov => (
          <li key={ov._id}>
            <span>{ov.content} (x:{ov.position.x}, y:{ov.position.y}, w:{ov.size.w}, h:{ov.size.h})</span>
            <button onClick={() => handleDelete(ov._id)} disabled={loading}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}