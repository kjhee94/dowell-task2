package com.dowell.bo.stock.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.dowell.bo.stock.model.Prt;
import com.dowell.bo.stock.model.Stock;

@Mapper
@Repository
public interface StockMapper {
	
	List<Stock> getStockList();

	List<Prt> searchPrt(String query);

	List<Stock> searchStock(Stock s);

	List<Stock> getStockPrdList(Stock s);

	List<String> getOption();

	List<Stock> searchStockPrdList(Stock s);

	int updateStock(List<Stock> list);

	int insertStockHt(List<Stock> list);

	List<Stock> getStockHtList(String query);

	List<Stock> searchStockHtList(Stock s);
}
