import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, createContext } from 'react'
import {
  Container, Typography, Box, Card, CardContent,
  Chip, Grid, Button, TextField, Divider, Switch, FormControlLabel, Slider,
} from '@mui/material'

// ── useContext setup ──────────────────────────────────────────────────────────
const ColorContext = createContext()

// ── useReducer setup ──────────────────────────────────────────────────────────
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 }
    case 'DECREMENT': return { count: state.count - 1 }
    case 'RESET': return { count: 0 }
    default: return state
  }
}

// 1. useState ──────────────────────────────────────────────────────────────────
function DemoUseState() {
  const [count, setCount] = useState(0)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="outlined" size="small" onClick={() => setCount(c => c - 1)}>-</Button>
      <Typography variant="h5" sx={{ minWidth: 40, textAlign: 'center', fontWeight: 700 }}>{count}</Typography>
      <Button variant="outlined" size="small" onClick={() => setCount(c => c + 1)}>+</Button>
      <Button variant="contained" size="small" color="error" onClick={() => setCount(0)}>Reset</Button>
    </Box>
  )
}

// 2. useEffect ─────────────────────────────────────────────────────────────────
function DemoUseEffect() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [running])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, minWidth: 60 }}>
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
      </Typography>
      <Button variant="contained" size="small" color={running ? 'error' : 'success'} onClick={() => setRunning(r => !r)}>
        {running ? 'Pausar' : 'Iniciar'}
      </Button>
      <Button variant="outlined" size="small" onClick={() => { setSeconds(0); setRunning(false) }}>Reset</Button>
    </Box>
  )
}

// 3. useContext ────────────────────────────────────────────────────────────────
function ColorBox() {
  const { color } = useContext(ColorContext)
  return (
    <Box sx={{ width: 60, height: 60, bgcolor: color, borderRadius: 2, border: '2px solid rgba(0,0,0,0.1)', transition: 'background 0.3s' }} />
  )
}

function DemoUseContext() {
  const [color, setColor] = useState('#1a1a2e')
  const colors = ['#1a1a2e', '#e8b86d', '#e53935', '#43a047', '#1e88e5']
  return (
    <ColorContext.Provider value={{ color }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <ColorBox />
        <Box sx={{ display: 'flex', gap: 1 }}>
          {colors.map(c => (
            <Box key={c} onClick={() => setColor(c)} sx={{
              width: 28, height: 28, borderRadius: '50%', bgcolor: c, cursor: 'pointer',
              border: color === c ? '3px solid black' : '2px solid transparent',
            }} />
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary">El cuadro recibe el color via contexto</Typography>
      </Box>
    </ColorContext.Provider>
  )
}

// 4. useReducer ────────────────────────────────────────────────────────────────
function DemoUseReducer() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Button variant="outlined" size="small" onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>
      <Typography variant="h5" sx={{ minWidth: 40, textAlign: 'center', fontWeight: 700 }}>{state.count}</Typography>
      <Button variant="outlined" size="small" onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
      <Button variant="contained" size="small" color="error" onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
    </Box>
  )
}

// 5. useCallback ───────────────────────────────────────────────────────────────
function DemoUseCallback() {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)

  const addItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button variant="contained" size="small" onClick={addItem}>Agregar item</Button>
        <Button variant="outlined" size="small" onClick={() => setCount(c => c + 1)}>Re-render ({count})</Button>
        <Button variant="outlined" size="small" color="error" onClick={() => setItems([])}>Limpiar</Button>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {items.map((item, i) => <Chip key={i} label={item} size="small" />)}
      </Box>
      <Typography variant="caption" color="text.secondary">
        addItem no se recrea en cada render gracias a useCallback
      </Typography>
    </Box>
  )
}

// 6. useMemo ───────────────────────────────────────────────────────────────────
function DemoUseMemo() {
  const [num, setNum] = useState(5)
  const [toggle, setToggle] = useState(false)

  const factorial = useMemo(() => {
    let r = 1
    for (let i = 2; i <= num; i++) r *= i
    return r
  }, [num])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="body2">Numero: <strong>{num}</strong></Typography>
      <Slider value={num} onChange={(_, v) => setNum(v)} min={1} max={12} step={1} marks size="small" />
      <Typography variant="body1">Factorial de {num} = <strong>{factorial.toLocaleString()}</strong></Typography>
      <FormControlLabel
        control={<Switch size="small" checked={toggle} onChange={() => setToggle(t => !t)} />}
        label={<Typography variant="caption">Este switch NO recalcula el factorial</Typography>}
      />
    </Box>
  )
}

// 7. useRef ────────────────────────────────────────────────────────────────────
function DemoUseRef() {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [prevValue, setPrevValue] = useState('')

  useEffect(() => {
    setPrevValue(value)
  }, [value])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          inputRef={inputRef}
          label="Escribe algo"
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" size="small" onClick={() => inputRef.current.focus()}>Focus</Button>
        <Button variant="outlined" size="small" onClick={() => setValue('')}>Limpiar</Button>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Valor anterior: <strong>{prevValue || '(vacio)'}</strong> — useRef accede al DOM sin re-renderizar
      </Typography>
    </Box>
  )
}

// ── Datos ─────────────────────────────────────────────────────────────────────
const HOOKS = [
  { name: 'useState', color: '#e3f2fd', border: '#1e88e5',
    description: 'Permite anadir estado local a los componentes funcionales. Devuelve un valor con estado y una funcion para actualizarlo.',
    demo: <DemoUseState /> },
  { name: 'useEffect', color: '#f3e5f5', border: '#8e24aa', 
    description: 'Maneja efectos secundarios como peticiones API, suscripciones o manipulacion del DOM, reemplazando componentDidMount.',
    demo: <DemoUseEffect /> },
  { name: 'useContext', color: '#e8f5e9', border: '#43a047', 
    description: 'Facilita el acceso a valores de un contexto de React, permitiendo compartir datos entre componentes sin pasar props manualmente.',
    demo: <DemoUseContext /> },
  { name: 'useReducer', color: '#fff3e0', border: '#fb8c00', 
    description: 'Alternativa a useState para gestionar estados complejos o logicos, util cuando el siguiente estado depende del anterior.',
    demo: <DemoUseReducer /> },
  { name: 'useCallback', color: '#fce4ec', border: '#e53935', 
    description: 'Memoriza funciones para evitar su re-creacion en cada renderizado, mejorando el rendimiento.',
    demo: <DemoUseCallback /> },
  { name: 'useMemo', color: '#e0f7fa', border: '#00acc1', 
    description: 'Memoriza el resultado de un calculo costoso para que solo se vuelva a calcular cuando cambien sus dependencias.',
    demo: <DemoUseMemo /> },
  { name: 'useRef', color: '#ede7f6', border: '#5e35b1', 
    description: 'Crea una referencia persistente a un elemento DOM o almacena valores mutables que no provocan renderizados al cambiar.',
    demo: <DemoUseRef /> },
]

// ── Pagina ─────────────────────────────────────────────────────────────────────
export default function Hooks() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Chip label="React Hooks" color="primary" sx={{ mb: 2, fontWeight: 700 }} />
        <Typography variant="h3" sx={{ mb: 1 }}>Hooks de React</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 550, mx: 'auto' }}>
          Los 7 hooks mas importantes de React con demostraciones interactivas.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {HOOKS.map((hook, i) => (
          <Grid item xs={12} sm={6} key={hook.name}>
            <Card sx={{
              height: '100%', bgcolor: hook.color,
              border: `2px solid ${hook.border}`, boxShadow: 'none',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 8px 24px ${hook.border}40` },
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Typography variant="h4">{hook.emoji}</Typography>
                  <Box>
                    <Chip label={`#${i + 1}`} size="small" sx={{ bgcolor: hook.border, color: 'white', fontWeight: 700, mb: 0.5 }} />
                    <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700, color: hook.border, lineHeight: 1 }}>
                      {hook.name}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2, color: 'text.secondary' }}>
                  {hook.description}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: `${hook.border}40` }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: hook.border, display: 'block', mb: 1.5, letterSpacing: '0.08em' }}>
                  PRUEBALO:
                </Typography>
                {hook.demo}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}