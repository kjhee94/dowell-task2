package com.dowell.bo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;

import com.dowell.bo.stock.service.StockService;


@Controller
public class ViewController {
	
	@Autowired
	private StockService stockService;
	
	//메인
	@GetMapping(value="/")
	public String home() {
		return "redirect:product";
	}
	
	//상품 리스트
	@GetMapping("/product")
	public String getProductList() {
		return "product/prdList";
	}
	
	//상품등록 페이지
	@GetMapping("/product/prdAddPop")
	public String prdAdd() {
		return "product/prdAddPop";
	}
	
	//상품수정 페이지
	@GetMapping("/product/prdUpdPop") 
	public String prdUpd() { 
		return "product/prdUpdPop"; 
	}
	
	//매장별 재고조회 페이지
	@GetMapping("/stock")
	public String getStockList() { 
		return "stock/stockList"; 
	}
	
	//매장조회 팝업오픈
	@GetMapping("/stock/prtPop")
	public String getPrtList() {
		return "stock/prtPop";
	}
	
	//매장별 재고조정 페이지(재고조회에서 바로 연결)
	@GetMapping("/stock/stockUpd")
	public String stockUpd(@RequestParam("prtCd") String prtCd,
						   @RequestParam("prtNm") String prtNm,
						   @RequestParam("prdCd") String prdCd,
						   @RequestParam("prdNm") String prdNm,
						    Model model) {
		List<String> list = stockService.getOption();
		model.addAttribute("options", list);
		model.addAttribute("prtCd", prtCd);
        model.addAttribute("prtNm", prtNm);
        model.addAttribute("prdCd", prdCd);
        model.addAttribute("prdNm", prdNm);
		return "stock/stockUpd";
	}
	
	//매장별 재고조정 페이지
	@GetMapping("/stock/stockUpdAll")
	public String stockUpd(Model model) {
		List<String> list = stockService.getOption();
		model.addAttribute("options", list);
		return "stock/stockUpd";
	}
	
	//매장별 재고조정이력 페이지(재고 조정에서 바로 연결)
	@GetMapping("/stock/stockHt")
	public String getstockHtList(@RequestParam("prtCd") String prtCd,
			   					 @RequestParam("prtNm") String prtNm,
			   					  Model model) {
		model.addAttribute("prtCd", prtCd);
        model.addAttribute("prtNm", prtNm);
		return "stock/stockHt";
	}
	
	//매장별 재고조정이력 페이지
	@GetMapping("/stock/stockHtAll")
	public String getstockHtList() {
		return "stock/stockHt";
	}
}