package com.dowell.bo.stock.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dowell.bo.stock.mapper.StockMapper;
import com.dowell.bo.stock.model.Prt;
import com.dowell.bo.stock.model.Stock;


@Service
public class StockServiceImpl implements StockService {

	@Autowired
	private StockMapper stockMapper;
	
	//매장별 재고조회
	@Override
	public List<Stock> getStockList() {
		return stockMapper.getStockList();
	}

	//매장 찾기
	@Override
	public List<Prt> searchPrt(String query) {
		return stockMapper.searchPrt(query);
	}

	//매장별 재고 검색
	@Override
	public List<Stock> searchStock(Stock s) {
		return stockMapper.searchStock(s);
	}

	//매장별 재고조정 리스트
	@Override
	public List<Stock> getStockPrdList(Stock s) {
		return stockMapper.getStockPrdList(s);
	}

	//조정사유 옵션(view 단에서 사용)
	@Override
	public List<String> getOption() {
		return stockMapper.getOption();
	}

	//매장별 재고조정 리스트 검색
	@Override
	public List<Stock> searchStockPrdList(Stock s) {
		return stockMapper.searchStockPrdList(s);
	}

	//매장별 재고조정
	@Override
	@Transactional
	public boolean updateStock(List<Stock> list) {
		//재고조정 이력 인입
		int istHtRst = stockMapper.insertStockHt(list);
		//재고 수정
		int updResult = stockMapper.updateStock(list);
		
		if(istHtRst<0 && updResult<0) {
        	return true;
        }else {
        	return false;
        }
	}

	//매장별 재고조정이력 리스트
	@Override
	public List<Stock> getStockHtList(String query) {
		return stockMapper.getStockHtList(query);
	}

	//매장별 재고조정이력 검색
	@Override
	public List<Stock> searchStockHtList(Stock s) {
		return stockMapper.searchStockHtList(s);
	}
}
