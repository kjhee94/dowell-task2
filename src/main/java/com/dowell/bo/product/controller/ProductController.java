package com.dowell.bo.product.controller;

import java.io.File;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dowell.bo.product.model.Product;
import com.dowell.bo.product.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired(required=true)
	private ProductService productService;
	
	//모든 상품 조회
	@GetMapping
	public ResponseEntity<List<Product>> getProduct() {
		log.info("getProduct========================================");
		try {
			List<Product> list = productService.getProduct();
	        log.info("상품 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//특정 상품 검색
	@PostMapping("/search")
	public ResponseEntity<List<Product>> searchPrd(@RequestBody Product prd) {
		log.info("searchPrd========================================");
		log.info("prdNm : "+prd.getPrdNm()+", prdCd : "+prd.getPrdCd());
		try {
			List<Product> list = productService.searchPrd(prd);
	        log.info("검색 상품 list = {}", list.toString());
	        return new ResponseEntity<>(list, HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//제품 등록
	@PostMapping
	public ResponseEntity<String> createPrd(@ModelAttribute Product prd) {
		log.info("createPrd========================================");
		try {
	        log.info("등록 product = {}", prd.toString());
	        
	        // 이미지 파일만 업로드 가능
	        MultipartFile uploadFile = prd.getPrdImg();
	        if(!uploadFile.isEmpty()) {
	        	if (!Objects.requireNonNull(uploadFile.getContentType()).startsWith("image")) {
	                log.warn("this file is not image type");
	                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
	            }
	        }
	        
	        boolean result = productService.createProduct(prd);
	        
	        if(result) {
	        	return new ResponseEntity<>(HttpStatus.OK);
	        }else {
	        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//이미지 다운로드
	@GetMapping("/download/{prdImgNm:.+}")
	private ResponseEntity<Resource> downloadImage(@PathVariable String prdImgNm) {
		log.info("downloadImage========================================");
		log.info("prdImgNm = {}", prdImgNm);
		try {
			String prdCd = prdImgNm.substring(0,prdImgNm.lastIndexOf("_"));
			String prdImgAddr = "C:\\dev\\workspace\\stock\\stock\\src\\main\\resources\\static\\uploads\\"+prdCd;
			String filePath = prdImgAddr+File.separator+prdImgNm;
			Resource resource = new UrlResource("file:"+filePath);
			
			if (resource.exists() && resource.isReadable()) {
				return ResponseEntity.ok()
					   .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + prdImgNm + "\"")
					   .body(resource);
			}else {
				return ResponseEntity.notFound().build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	//제품 수정
	@PutMapping
	public ResponseEntity<String> updatePrd(@ModelAttribute Product prd) {
		log.info("updatePrd========================================");
		try {
	        log.info("수정 product = {}", prd.toString());
	        
	        // 이미지 파일만 업로드 가능
	        MultipartFile uploadFile = prd.getPrdImg();
	        if(!uploadFile.isEmpty()) {
	        	if (!Objects.requireNonNull(uploadFile.getContentType()).startsWith("image")) {
	                log.warn("this file is not image type");
	                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
	            }
	        }
	        
	        boolean result = productService.updatePrd(prd);
	        
	        if(result) {
	        	return new ResponseEntity<>(HttpStatus.OK);
	        }else {
	        	return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	//제품 삭제
	@PostMapping("/delete")
	public ResponseEntity<Integer> deletePrd(@RequestBody Integer[] prdCdList) {
		log.info("deletePrd========================================");
		try {
	        log.info("prdCdList = {}", prdCdList);
	        return new ResponseEntity<>(productService.deletePrd(prdCdList), HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
