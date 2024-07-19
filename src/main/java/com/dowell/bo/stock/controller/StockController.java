package com.dowell.bo.stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dowell.bo.stock.model.Prt;
import com.dowell.bo.stock.model.Stock;
import com.dowell.bo.stock.service.StockService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PutMapping;


@Slf4j
@RestController
@RequestMapping("/api/stocks")
public class StockController {

	@Autowired
	private StockService stockService;
	
	//매장별 재고조회
	@GetMapping
	public ResponseEntity<List<Stock>> getStockList() {
		log.info("getStockList========================================");
		try {
			List<Stock> list = stockService.getStockList();
	        log.info("매장재고 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//매장 찾기
	@PostMapping("/prt/search")
	public ResponseEntity<List<Prt>> searchPrt(@RequestBody String keyword) {
		log.info("searchPrt========================================");
		String query = keyword.replaceAll("\"", "");
		log.info("검색어 : "+query);
		try {
			List<Prt> list = stockService.searchPrt(query);
	        log.info("매장 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) { 
			e.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	//매장별 재고 검색
	@PostMapping("/search")
	public ResponseEntity<List<Stock>> searchStock(@RequestBody Stock s) {
		log.info("searchStock========================================");
		log.info("prtCd : "+s.getPrtCd()+", prtNm : "+s.getPrtNm());
		log.info("prdCd : "+s.getPrdCd()+", prdNm : "+s.getPrdNm());
		try {
			List<Stock> list = stockService.searchStock(s);
	        log.info("매장재고 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) { 
			e.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	//매장별 재고조정 리스트
	@PostMapping("/product")
	public ResponseEntity<List<Stock>> getStockPrdList(@RequestBody Stock s) {
		log.info("getStockPrdList========================================");
		log.info("prtCd : "+s.getPrtCd()+" / prdCd : "+s.getPrdCd() );
		try {
			List<Stock> list = stockService.getStockPrdList(s);
	        log.info("매장재고 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) { 
			e.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	//매장별 재고조정 검색
	@PostMapping("/product/search")
	public ResponseEntity<List<Stock>> searchStockPrdList(@RequestBody Stock s) {
		log.info("searchStockPrdList========================================");
		log.info("prtCd : "+s.getPrtCd()+", prtNm : "+s.getPrtNm());
		log.info("prdCd : "+s.getPrdCd()+", prdNm : "+s.getPrdNm());
		try {
			List<Stock> list = stockService.searchStockPrdList(s);
	        log.info("매장재고 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) { 
			e.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
	
	//매장별 재고조정
	@PutMapping
	public ResponseEntity<String> updateStock(@RequestBody List<Stock> list) {
		log.info("updateStock========================================");
		try {
	        log.info("수정 Stock = {}", list.toString());
	        
	        boolean result = stockService.updateStock(list);
	        if(result) {
	        	return new ResponseEntity<>(HttpStatus.OK);
	        }else {
	        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//매장별 재고조정이력
	@PostMapping("/history")
	public ResponseEntity<List<Stock>> getStockHtList(@RequestBody String prtCd) {
		log.info("getStockHtList========================================");
		String query = prtCd.replaceAll("\"", "");
		log.info("prtCd : "+query);
		try {
			List<Stock> list = stockService.getStockHtList(query);
	        log.info("매장재고이력 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//매장별 재고조정이력 검색
	@PostMapping("/history/search")
	public ResponseEntity<List<Stock>> searchStockHtList(@RequestBody Stock s) {
		log.info("searchStockPrdList========================================");
		log.info("prtCd : "+s.getPrtCd()+", prtNm : "+s.getPrtNm());
		log.info("prdCd : "+s.getPrdCd()+", prdNm : "+s.getPrdNm());
		try {
			List<Stock> list = stockService.searchStockHtList(s);
	        log.info("매장재고이력 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) { 
			e.printStackTrace();
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}
}
