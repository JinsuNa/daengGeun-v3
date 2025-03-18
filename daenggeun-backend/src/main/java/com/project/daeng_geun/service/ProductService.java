package com.project.daeng_geun.service;

import com.project.daeng_geun.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
//    // 모든 상품 가져오기
//    public List<Item> getAllItems() {
//        return itemRepository.findAll();
//    }
//
//    // 상품 등록
//    public Item createItem(Item item) {
//        return itemRepository.save(item);
//    }
}
