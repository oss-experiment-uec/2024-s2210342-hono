import { splitPath, getPattern, getPathFromURL, isAbsoluteURL } from './url'

describe('url', () => {
  it('splitPath', () => {
    let ps = splitPath('/')
    expect(ps[0]).toBe('')
    ps = splitPath('/hello')
    expect(ps[0]).toBe('hello')
    ps = splitPath('*')
    expect(ps[0]).toBe('*')
    ps = splitPath('/wildcard-abc/*/wildcard-efg')
    expect(ps[0]).toBe('wildcard-abc')
    expect(ps[1]).toBe('*')
    expect(ps[2]).toBe('wildcard-efg')
    ps = splitPath('/map/:location/events')
    expect(ps[0]).toBe('map')
    expect(ps[1]).toBe(':location')
    expect(ps[2]).toBe('events')
  })

  it('getPattern', () => {
    let res = getPattern(':id')
    expect(res).not.toBeNull()
    expect(res[0]).toBe('id')
    expect(res[1]).toBe('(.+)')
    res = getPattern(':id{[0-9]+}')
    expect(res[0]).toBe('id')
    expect(res[1]).toBe('([0-9]+)')
  })

  it('getPathFromURL', () => {
    let path = getPathFromURL('https://example.com/')
    expect(path).toBe('/')
    path = getPathFromURL('https://example.com/hello')
    expect(path).toBe('/hello')
    path = getPathFromURL('https://example.com/hello/hey')
    expect(path).toBe('/hello/hey')
    path = getPathFromURL('https://example.com/hello?name=foo')
    expect(path).toBe('/hello')
    path = getPathFromURL('https://example.com/hello/hey?name=foo&name=bar')
    expect(path).toBe('/hello/hey')
    path = getPathFromURL('https://example.com/hello/hey#fragment')
    expect(path).toBe('/hello/hey')
  })

  describe('isAbsoluteURL', () => {
    it('absolute url', () => {
      expect(isAbsoluteURL('https://example.com')).toBeTruthy()
      expect(isAbsoluteURL('https://example.com/xxx')).toBeTruthy()
    })
    it('relative url', () => {
      expect(isAbsoluteURL('/')).not.toBeTruthy()
      expect(isAbsoluteURL('/location')).not.toBeTruthy()
      expect(isAbsoluteURL('')).not.toBeTruthy()
    })
  })
})
