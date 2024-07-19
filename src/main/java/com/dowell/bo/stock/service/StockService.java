package com.dowell.bo.stock.service;

import java.util.List;

import com.dowell.bo.stock.model.Prt;
import com.dowell.bo.stock.model.Stock;

public interface StockService {

	public List<Stock> getStockList();

	public List<Prt> searchPrt(String query);

	public List<Stock> searchStock(Stock s);

	public List<Stock> getStockPrdList(Stock s);

	public List<String> getOption();

	public List<Stock> searchStockPrdList(Stock s);

	public boolean updateStock(List<Stock> list);

	public List<Stock> getStockHtList(String query);

	public List<Stock> searchStockHtList(Stock s);
}
