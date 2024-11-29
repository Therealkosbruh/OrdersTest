<?php

use yii\db\Migration;

/**
 * Class m241129_113104_insert_products_data
 */
class m241129_113104_insert_products_data extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
         $this->batchInsert('{{%products}}', ['product_name', 'product_price', 'img'], [
            ['Освежитель', 800, 'https://i.postimg.cc/pVgr2KsH/smellkiller.png'],
            ['Очиститель', 500, 'https://i.postimg.cc/MptzjBmX/refresher.png'],
            ['Полимер кузова', 1500, 'https://i.postimg.cc/CxxWXQbL/hydropolimer.png'],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->delete('{{%products}}', ['product_name' => 'Освежитель']);
        $this->delete('{{%products}}', ['product_name' => 'Очиститель']);
        $this->delete('{{%products}}', ['product_name' => 'Полимер кузова']);
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m241129_113104_insert_products_data cannot be reverted.\n";

        return false;
    }
    */
}
