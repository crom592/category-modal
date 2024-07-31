// src/App.js

import React, { useState } from 'react';
import { Button } from 'antd';
import CategoryModal from './CategoryModal';
import categories from './categories.json'; // JSON 데이터를 임포트

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={showModal}>
        카테고리 선택
      </Button>
      <CategoryModal visible={modalVisible} onClose={closeModal} categories={categories} />
    </div>
  );
};

export default App;
