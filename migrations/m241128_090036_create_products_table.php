<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%products}}`.
 */
class m241128_090036_create_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%products}}', [
            'product_id' => $this->primaryKey(),
            'product_name' => $this->string(255)->notNull(),
            'product_price' => $this->integer()->notNull(),
            'img' => $this->string(255)->null(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%products}}');
    }
}
