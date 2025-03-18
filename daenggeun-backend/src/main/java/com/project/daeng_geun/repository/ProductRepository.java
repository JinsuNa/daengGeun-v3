package com.project.daeng_geun.repository;

import org.eclipse.angus.mail.imap.protocol.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Item, Long> {
}
