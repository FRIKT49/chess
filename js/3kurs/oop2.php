<style>
    body{
        background-color: #2d2a2e;
        color:white;
        font-size: 40px;
    }
</style>
<?
    class Computer{
		public $powerSupply;
		public $mBoard;
		public $cpu;
		public $gpu;
		public $ram;
		public $powerStatus = 0;
		
		public function __construct($powerSupply, $mBoard, $cpu, $gpu, $ram){
			$this->powerSupply = $powerSupply;
			$this->mBoard = $mBoard;
			$this->cpu = $cpu;
			$this->gpu = $gpu;
			$this->ram = $ram;
		}
		
		public function enableComputer(){
			if(!$this->powerStatus){
				$this->powerStatus = 1;
				echo "<br/>".$this->getComputerName()." Компьютер был включен<br/>";
			}else{
				echo "<br/>".$this->getComputerName()." Компьютер уже включен!<br/>";
			}
		}
		
		public function desableComputer(){
			if($this->powerStatus){
				$this->powerStatus = 0;
				echo "<br/>".$this->getComputerName()." Компьютер был ВЫключен<br/>";
			}else{
				echo "<br/>".$this->getComputerName()." Компьютер уже ВЫключен!<br/>";
			}
		}
		
		public function getComputerName(){
			return $this->mBoard.': '.$this->cpu.', '.$this->powerSupply;
		}
	} 
    
    $computer = new Computer('500W', 'ASUS TUF Gaming F15', 'Intel Core i9-10900K', 'GeForce RTX 3090', '16GB DDR4');
    $computer->enableComputer();
    $computer->desableComputer();
    
    class Excomputer extends Computer{
        public $storage;
        public $os;
        
        public function __construct($powerSupply, $mBoard, $cpu, $gpu, $ram, $storage, $os){
            parent::__construct($powerSupply, $mBoard, $cpu, $gpu, $ram);
            $this->storage = $storage;
            $this->os = $os;
        }
        public function getComputerName(){
            
            echo '<br/>'.parent::getComputerName().', Жесткий диск: '.$this->storage.', ОС: '.$this->os;
        }
    }
    $computer2 = new Excomputer('500W', 'ASUS TUF Gaming F15', 'Intel Core i9-10900K', 'GeForce RTX 3090', '16GB DDR4', '1500GB','Windows');
    $computer2->enableComputer();
    $computer2->desableComputer();
?>