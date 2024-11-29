<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%order_product}}`.
 */
class m241128_090258_create_order_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%order_product}}', [
            'id' => $this->primaryKey(),
            'order_id' => $this->integer()->notNull(),
            'product_id' => $this->integer()->notNull(),
            'price' => $this->decimal(10, 2)->notNull(),
        ]);
        
        $this->addForeignKey(
            'fk-order_product-order_id',
            '{{%order_product}}',
            'order_id',
            '{{%orders}}',
            'order_id',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-order_product-product_id',
            '{{%order_product}}',
            'product_id',
            '{{%products}}',
            'product_id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%order_product}}');
    }
}
