package com.dowell.bo.product.service;

import java.io.IOException;
import java.util.List;

import com.dowell.bo.product.model.Product;

public interface ProductService {
	
	public List<Product> getProduct();

	public List<Product> searchPrd(Product prd);

	public boolean createProduct(Product prd) throws IllegalStateException, IOException;

	public boolean updatePrd(Product prd) throws IllegalStateException, IOException;

	public int deletePrd(Integer[] prdCdList);
}
