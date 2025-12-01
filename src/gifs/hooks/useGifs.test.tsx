import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifsAction from "../actions/get-gifs-by-query.action";


describe('useGifs', () => {

  beforeEach(() => vi.clearAllMocks());

  test('should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });
  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());
    
    await act(async() => {
      await result.current.handleSearch('gatos');
    });
    expect(result.current.gifs.length).toBe(15);
  });
  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());
    
    await act(async () => {
      await result.current.handleTermClicked('gatos');
    });
    expect(result.current.gifs.length).toBe(15);
  });
  test('should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs());
    
    await act(async () => {
      await result.current.handleTermClicked('gatos');
    });
    expect(result.current.gifs.length).toBe(15);

    vi.spyOn(gifsAction, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'));

    await act(async () => {
      await result.current.handleTermClicked('gatos');
    });
    expect(result.current.gifs.length).toBe(15);
  });
  test('should return no more than 8 previous terms', async () => {
    const { result } = renderHook(() => useGifs());
    vi.spyOn(gifsAction, 'getGifsByQuery').mockResolvedValue([]);
    await act(async () => {
      await result.current.handleSearch('gatos1');
    });
    await act(async () => {
      await result.current.handleSearch('gatos2');
    });
    await act(async () => {
      await result.current.handleSearch('gatos3');
    });
    await act(async () => {
      await result.current.handleSearch('gatos4');
    });
    await act(async () => {
      await result.current.handleSearch('gatos5');
    });
    await act(async () => {
      await result.current.handleSearch('gatos6');
    });
    await act(async () => {
      await result.current.handleSearch('gatos7');
    });
    await act(async () => {
      await result.current.handleSearch('gatos8');
    });
    await act(async () => {
      await result.current.handleSearch('gatos9');
    });
    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      'gatos9', 'gatos8',
      'gatos7', 'gatos6',
      'gatos5', 'gatos4',
      'gatos3', 'gatos2'
    ]);
  });

  test('should not search gifs when query is empty', async () => {
    
    const { result } = renderHook(() => useGifs());

    const spy = vi.spyOn(gifsAction, 'getGifsByQuery').mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch('');
    });

    expect(spy).not.toHaveBeenCalled();
    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
  });
  test('should not search gifs when query already exists in previousTerms', async () => {
  const { result } = renderHook(() => useGifs());

  const spy = vi.spyOn(gifsAction, 'getGifsByQuery').mockResolvedValue([]);

  await act(async () => {
    await result.current.handleSearch('gatos');
  });

  const prevLength = result.current.previousTerms.length;

  await act(async () => {
    await result.current.handleSearch('gatos');
  });

  expect(spy).toHaveBeenCalledTimes(1);  
  expect(result.current.previousTerms.length).toBe(prevLength); 
});
});