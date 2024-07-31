// src/CategoryModal.js

import React, { useState } from 'react';
import { Modal, Button, List, Checkbox } from 'antd';

const CategoryModal = ({ visible, onClose, categories }) => {
  const [selectedMajorCategory, setSelectedMajorCategory] = useState(null);
  const [selectedMiddleCategory, setSelectedMiddleCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const handleMajorCategorySelect = (majorCategory) => {
    setSelectedMajorCategory(majorCategory);
    setSelectedMiddleCategory(null);
    setSelectedSubCategories([]);
  };

  const handleMiddleCategorySelect = (middleCategory) => {
    setSelectedMiddleCategory(middleCategory);
    setSelectedSubCategories([]);
  };

  const handleSubCategoryChange = (checkedValues) => {
    setSelectedSubCategories(checkedValues);
  };

  const uniqueMajorCategories = categories
    .filter((category) => category.level === 'Major')
    .reduce((unique, item) => {
      return unique.some((category) => category.name === item.name) ? unique : [...unique, item];
    }, []);

  const middleCategories = categories.filter((category) => category.parent === selectedMajorCategory?.id);
  const subCategories = categories.filter((category) => category.parent === selectedMiddleCategory?.id);

  return (
    <Modal
      title="필요하신 제품을 선택해주세요."
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          확인
        </Button>,
      ]}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <List
            bordered
            dataSource={uniqueMajorCategories}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleMajorCategorySelect(item)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: item.id === selectedMajorCategory?.id ? '#e6f7ff' : 'white',
                }}
              >
                {item.name}
              </List.Item>
            )}
          />
        </div>
        <div style={{ flex: 1, marginRight: '10px' }}>
          {selectedMajorCategory && (
            <List
              bordered
              dataSource={middleCategories}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleMiddleCategorySelect(item)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: item.id === selectedMiddleCategory?.id ? '#e6f7ff' : 'white',
                  }}
                >
                  {item.name}
                </List.Item>
              )}
            />
          )}
        </div>
        <div style={{ flex: 2 }}>
          {selectedMiddleCategory && (
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={handleSubCategoryChange}
              value={selectedSubCategories}
            >
              <List
                bordered
                dataSource={subCategories}
                renderItem={(item) => (
                  <List.Item>
                    <Checkbox value={item.id}>{item.name}</Checkbox>
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          )}
        </div>
      </div>
    </Modal>
  );
  };
  
  export default CategoryModal;
  
