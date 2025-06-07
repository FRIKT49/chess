<style>
    body{
        background-color: #2d2a2e;
        color:white;
        font-size: 40px;
    }
</style>
<?
    class carName{
        public $marka = '' ;
        public $model = '';
        public $money = '';
        public $country = '';
        
        public function echoCar(){
            echo $this->marka.' '.$this->model.' '.$this->money.' из '.$this->country.'<br/>';
        }
    }
    
    $car1 = new carName;
    
    $car1->marka = 'Mazda';
    $car1->model = 'rx7';
    $car1->money = 'expensive';
    $car1->country = 'Japan';
    
    $car2 = new carName;
 
    $car2->marka = 'Toyota';
    $car2->model = 'Cellica GT-4';
    $car2->money = 'cheap';
    $car2->country = 'Japan';
    
    $car3 = new carName;
    
    $car3->marka = 'corvete';
    $car3->model = 'C5';
    $car3->money = 'expencive';
    $car3->country = 'USA';
    
    $car1->echoCar();
    $car2->echoCar();
    $car3->echoCar();
?>