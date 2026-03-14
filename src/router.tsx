import React, { createContext, useContext, useState, useEffect, useCallback, Children } from 'react'

interface LocationState { pathname: string; search: string }
interface RouterContextType { location: LocationState; navigate: (to: string) => void }

const RouterContext = createContext<RouterContextType | null>(null)
const ParamsContext = createContext<Record<string, string>>({})

function parsePath(s: string): LocationState {
  const i = s.indexOf('?')
  return i < 0 ? { pathname: s, search: '' } : { pathname: s.slice(0, i), search: s.slice(i) }
}

function matchRoute(pattern: string, pathname: string): { ok: boolean; params: Record<string, string> } {
  if (pattern === '*') return { ok: true, params: {} }
  const pp = pattern.replace(/^\/|\/$/g, '').split('/').filter(Boolean)
  const up = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean)
  if (pp.length !== up.length) return { ok: false, params: {} }
  const params: Record<string, string> = {}
  for (let i = 0; i < pp.length; i++) {
    if (pp[i][0] === ':') params[pp[i].slice(1)] = decodeURIComponent(up[i] || '')
    else if (pp[i] !== up[i]) return { ok: false, params: {} }
  }
  return { ok: true, params }
}

export function BrowserRouter({ children }: { children: React.ReactNode }) {
  const get = () => parsePath(window.location.pathname + window.location.search)
  const [location, setLocation] = useState<LocationState>(get)
  useEffect(() => {
    const h = () => { setLocation(get()); window.scrollTo(0, 0) }
    window.addEventListener('popstate', h)
    return () => window.removeEventListener('popstate', h)
  }, [])
  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to)
    setLocation(parsePath(to))
    window.scrollTo(0, 0)
  }, [])
  return <RouterContext.Provider value={{ location, navigate }}>{children}</RouterContext.Provider>
}

export function Routes({ children }: { children: React.ReactNode }) {
  const ctx = useContext(RouterContext)!
  for (const child of Children.toArray(children) as React.ReactElement[]) {
    const { ok, params } = matchRoute(child.props.path, ctx.location.pathname)
    if (ok) return <ParamsContext.Provider value={params}>{child.props.element}</ParamsContext.Provider>
  }
  return null
}

export function Route(_props: { path: string; element: React.ReactNode }) { return null }

export function useNavigate() { return useContext(RouterContext)!.navigate }
export function useLocation() { return useContext(RouterContext)!.location }
export function useParams<T extends Record<string, string>>() { return useContext(ParamsContext) as T }

export function useSearchParams(): [URLSearchParams, (p: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => void] {
  const { location, navigate } = useContext(RouterContext)!
  const sp = new URLSearchParams(location.search)
  const set = (ns: URLSearchParams | ((p: URLSearchParams) => URLSearchParams)) => {
    const s = typeof ns === 'function' ? ns(sp) : ns
    navigate(location.pathname + (s.toString() ? '?' + s.toString() : ''))
  }
  return [sp, set]
}
