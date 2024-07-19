package com.dowell.bo.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.dowell.bo.product.model.Product;

@Mapper
@Repository
public interface ProductMapper {

	List<Product> getProduct();
	
	List<Product> searchPrd(Product prd);

	String getPrdCd();
	
	int uploadImage(Product prd);
	
	int createProduct(Product prd);
	
	int updateImgYn(String prdCd);
	
	int updatePrd(Product prd);
	
	int deletePrd(Integer[] prdCdList);

	
}
